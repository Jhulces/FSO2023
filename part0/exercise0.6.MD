:::mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
   
    Note left of browser: The user clicks Save button after filling text field (or not)
    user->>browser: Click Save BUTTON
    activate browser
    
    Note right of browser: The browser use the javascript code push the new quote and render it <br/> then sends the quote to the server in JSON format
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    deactivate browser
    activate server
    server-->>browser: Confirmation of note creation
    deactivate server

:::