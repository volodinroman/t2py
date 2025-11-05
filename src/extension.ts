// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "t2py" is now active!');

	// --- Command Convert List ---
	const convertCmd = vscode.commands.registerCommand('t2py.convertList', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const doc = editor.document;
		const sel = editor.selection;
		const fullRange = new vscode.Range(
			new vscode.Position(0, 0),
			new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length)
		);
		const rangeToProcess = sel && !sel.isEmpty ? sel : fullRange;
		const raw = doc.getText(rangeToProcess);

		const lines = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);

		const norm = (s: string) => {
			// remove trailing commas and spaces
			let str = s.replace(/,+\s*$/, '');
			// remove surrounding quotes
			str = str.replace(/^["']|["']$/g, '');
			// Escape only backslashes
			str = str.replace(/\\/g, '/');
			// Add correct quotes
			return `"${str}"`;
		};

		const body = lines.map(norm).join(',\n  ');
		const snippet = new vscode.SnippetString(`${'${1:my_list}'} = [\n  ${body}\n]\n`);
		await editor.insertSnippet(snippet, rangeToProcess);
	});

	// --- Command Validate Paths ---
	const expandHome = (p: string) => p.startsWith('~') ? p.replace(/^~(?=\/|$)/, os.homedir()) : p;

	const looksLikePath = (s: string): boolean => {
		const trimmed = s.trim().replace(/^['"]/, ''); // remove leading quote if any
		// supports: C:\, C:/, ./, ../, ~/, /, Z:/ etc.
		return /^([A-Za-z]:[\\/]|\.{0,2}\/|~\/|\/)/.test(trimmed);
	};

	const validatePathsCmd = vscode.commands.registerCommand('t2py.validatePaths', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const doc = editor.document;
		const sel = editor.selection;

		// Determine the range to process
		const rangeToProcess = sel && !sel.isEmpty
			? new vscode.Range(
				new vscode.Position(sel.start.line, 0),
				new vscode.Position(sel.end.line, doc.lineAt(sel.end.line).text.length)
			)
			: new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length)
			);

		const raw = doc.getText(rangeToProcess);
		const lines = raw.split(/\r?\n/);

		const maxLen = Math.max(...lines.map(l => l.trimEnd().length), 10);

		const results = lines.map(origLine => {
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
			const exists = candidate.length > 0 && fs.existsSync(candidate);

			const padding = ' '.repeat(Math.max(1, maxLen - trimmed.length + 2));
			const lineWithStatus = `${trimmed}${padding}>> ${exists ? 'success' : 'fail'}`;
			return leading + lineWithStatus;
		});

		await editor.edit(editBuilder => {
			editBuilder.replace(rangeToProcess, results.join('\n'));
		});
	});




	context.subscriptions.push(convertCmd, validatePathsCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
