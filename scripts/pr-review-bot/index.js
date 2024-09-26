import { commentOnPullRequest, getPRBody } from './github.js'

const genericMessage = "This PR does not pass all the checklist mentioned in description, because of which we are closing the PR. Re-open it when all checklist items are passed"

import { marked } from 'marked';

const prBody = await getPRBody()
console.log("Read PR body")

// Parse the markdown to HTML or AST (Abstract Syntax Tree)
const lexer = marked.lexer(prBody);

// Find the checklist items in the parsed output
const checklistItems = lexer.find(item => item.type === 'list').items.map(item => {
    const isChecked = item.raw.includes('[x]');
    const text = item.raw.replace(/- \[.\] /, '').trim();
    return { text, checked: isChecked };
});

let checklistFailedTitles = ""

// Create message for comment on PR
for (let index = 0; index < checklistItems.length; index++) {
    const element = checklistItems[index];
    if (!element.checked) {
        checklistFailedTitles += index + 1 + ": " + element.text + '\n'
    }
}

const title = "PR Checklist Failed"

if (checklistFailedTitles !== "") {
    console.log("Comment on pr & closing it")
    commentOnPullRequest(title, genericMessage, checklistFailedTitles);
}