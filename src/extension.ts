// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Helpers
	// return a range (start-of-line .. end-of-line) covering either the selection
	// or the whole document when selection is empty.
	const getRangeToProcess = (doc: vscode.TextDocument, sel: vscode.Selection) => {
		return sel && !sel.isEmpty
			? new vscode.Range(
				new vscode.Position(sel.start.line, 0),
				new vscode.Position(sel.end.line, doc.lineAt(sel.end.line).text.length)
			)
			: new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length)
			);
	};

	// Prefer VS Code workspace FS when possible (supports remote workspaces).
	const safeExists = async (p: string): Promise<boolean> => {
		try {
			const uri = vscode.Uri.file(p);
			await vscode.workspace.fs.stat(uri);
			return true;
		} catch (e) {
			// stat throws when not found or inaccessible
			return false;
		}
	};
	const fixDoubleSlashes = (s: string) => {
		// Unify separators first
		let out = s.replace(/\\/g, '/');

		// Preserve URL schemes like https://, file://, etc.
		if (/^[a-zA-Z][\w+.-]*:\/\//.test(out)) {
			return out;
		}

		// Preserve UNC prefix (//server/share), but collapse extras:
		if (out.startsWith('//')) {
			// Ensure exactly two leading slashes
			out = out.replace(/^\/{2,}/, '//');
			// Collapse any remaining multiple slashes to one
			out = out.replace(/\/{2,}/g, '/');
			return out;
		}

		// Normal paths: collapse any multiple slashes to one
		out = out.replace(/\/{2,}/g, '/');
		return out;
	};

	const expandHome = (p: string) => p.startsWith('~') ? p.replace(/^~(?=\/|$)/, os.homedir()) : p;

	const looksLikePath = (s: string): boolean => {
		const trimmed = s.trim().replace(/^['"]/, ''); // remove leading quote if any
		// supports: C:\, C:/, ./, ../, ~/, /, Z:/ etc.
		return /^([A-Za-z]:[\\/]|\.{0,2}[\\/]|~[\\/]|[\\/])/.test(trimmed);
	};

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "t2py" is now active!');

	// --- Command Convert List ---
	const convertCmd = vscode.commands.registerCommand('t2py.convertList', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const doc = editor.document;
		const sel = editor.selection;
		const rangeToProcess = getRangeToProcess(doc, sel);

		const raw = doc.getText(rangeToProcess);
		const lines = raw.split(/\r?\n/);

		const norm = (s: string) => {
			let str = s.replace(/,+\s*$/, '');      // remove trailing commas
			str = str.replace(/^["']|["']$/g, '');  // strip surrounding quotes
			str = fixDoubleSlashes(str);            // <-- handles //, \\, mixed, URLs, UNC
			return `"${str}"`;
		};

		const body = lines.map(norm).join(',\n  ');
		const snippet = new vscode.SnippetString(`${'${1:my_list}'} = [\n  ${body}\n]\n`);
		await editor.insertSnippet(snippet, rangeToProcess);
	});

	


	const validatePathsCmd = vscode.commands.registerCommand('t2py.validatePaths', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const doc = editor.document;
		const sel = editor.selection;
		const rangeToProcess = getRangeToProcess(doc, sel);

		const raw = doc.getText(rangeToProcess);
		const lines = raw.split(/\r?\n/);

		const maxLen = Math.max(...lines.map(l => l.trimEnd().length), 10);

		const results = await Promise.all(lines.map(async origLine => {
			const trimmed = origLine.trimEnd();
			const leading = origLine.slice(0, origLine.length - trimmed.length);

			// Extract potential path from the line
			const match = trimmed.match(/^\s*["']?(.*?)["']?\s*,?\s*$/);
			const candidateRaw = match ? match[1] : trimmed;

			// Check if the string looks like a path
			if (!looksLikePath(candidateRaw)) {
				// Return the original line unchanged
				return origLine;
			}

			// Normalize for checking
			const candidate = path.normalize(expandHome(candidateRaw).replace(/\\/g, '/'));
			const exists = candidate.length > 0 && await safeExists(candidate);

			const padding = ' '.repeat(Math.max(1, maxLen - trimmed.length + 2));
			const lineWithStatus = `${trimmed}${padding}>> ${exists ? 'success' : 'fail'}`;
			return leading + lineWithStatus;
		}));

		await editor.edit(editBuilder => {
			editBuilder.replace(rangeToProcess, results.join('\n'));
		});
	});


	const normalizePathsCmd = vscode.commands.registerCommand('t2py.normalizePaths', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const doc = editor.document;
		const sel = editor.selection;

		const rangeToProcess = getRangeToProcess(doc, sel);

		const raw = doc.getText(rangeToProcess);
		const lines = raw.split(/\r?\n/);

		const normalizedLines = lines.map(line => {
			const trimmed = line.trim();

			if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) {
				return line; // skip empty/comments
			}

			if (/["',]/.test(trimmed)) {
				return line.replace(/\\/g, '/').replace(/([^:])\/{2,}/g, '$1/'); // handle inside quotes
			}

			if (looksLikePath(trimmed)) {
				const expanded = expandHome(trimmed);
				let normalized = path.normalize(expanded).replace(/\\/g, '/');
				normalized = fixDoubleSlashes(normalized);
				return normalized;
			}

			return line;
		});

		await editor.edit(editBuilder => {
			editBuilder.replace(rangeToProcess, normalizedLines.join('\n'));
		});
	});






	context.subscriptions.push(convertCmd, validatePathsCmd, normalizePathsCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
