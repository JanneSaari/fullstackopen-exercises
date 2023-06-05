Traditional webpage diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: status code 302 (URL redirect to /exampleapp/notes)
    deactivate server

    Note right of browser: browser tries to reload /notes

    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: notes.html
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: main.js
    deactivate server
    activate browser
    Note right of browser: Browser starts executing the JS code that tries to get JSON from the server

    browser->>server: GET /exampleapp/data.json
    deactivate browser
    activate server
    Note left of server: Server might get the data from database at this point and sends it to the browser in json format
    server-->>browser: data.json
    deactivate server

    activate browser
    Note right of browser: Browser continues executing the JS code that reads entries from data.json, and adds them to the page as a list
    deactivate browser

```
