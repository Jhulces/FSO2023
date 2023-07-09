:::mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
   
    Note left of browser: The user clicks Save button after filling text field (or not)
    user->>browser: Click Save BUTTON
    activate browser
    
    Note right of browser: The browser sends the quote to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    deactivate browser
    activate server
    server-->>browser: URL redirect
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the .json raw data (posted quote added)
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
:::