// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "t2py" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const helloCmd = vscode.commands.registerCommand('t2py.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from t2py!');
	});


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

		const norm = (s: string) => s.replace(/\\/g, '/').replace(/"/g, '\\"');
		const body = lines.map(l => `"${norm(l)}"`).join(',\n  ');

		// VS Code snippet with placeholder for variable name
		const snippet = new vscode.SnippetString(`${'${1:my_list}'} = [\n  ${body}\n]\n`);
		await editor.insertSnippet(snippet, rangeToProcess);
	});

	context.subscriptions.push(helloCmd, convertCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
