import React, { createContext, useReducer } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext();

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'change':
            return { ...prevState, text: action.payload };

        case 'uppercase':
            return { ...prevState, text: prevState.text.toUpperCase() };

        case 'lowercase':
            return { ...prevState, text: prevState.text.toLowerCase() };

        case 'clear':
            return { ...prevState, text: "" };

        case 'removeExtraSpaces':
            return { ...prevState, text: prevState.text.replace(/\s+/g, ' ').trim() };

        case 'copy':
            navigator.clipboard.writeText(prevState.text);
            toast.success('Text copied to clipboard');
            return prevState;

        case 'toggleDarkMode':
            return { ...prevState, darkMode: !prevState.darkMode };

        default:
            return prevState;
    }
}

function App() {
    const initialState = {
        text: "",
        darkMode: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <ToastContainer />
            <nav className={`navbar ${state.darkMode ? 'dark' : 'light'}`}>
                <div className="brand">
                    <h1>Word Counter</h1>
                </div>
                <div className="darkModeButton" onClick={() => dispatch({ type: 'toggleDarkMode' })}>
                    {state.darkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
            </nav>
            <div className={`container ${state.darkMode ? 'dark' : 'light'}`}>
                <div className="toolbar">
                    <button onClick={() => { dispatch({ type: 'uppercase' }) }}>Uppercase</button>
                    <button onClick={() => { dispatch({ type: 'lowercase' }) }}>Lowercase</button>
                    <button onClick={() => { dispatch({ type: 'clear' }) }}>Clear</button>
                    <button onClick={() => { dispatch({ type: 'removeExtraSpaces' }) }}>Remove Extra Spaces</button>
                    <button onClick={() => { dispatch({ type: 'copy' }) }}>Copy to Clipboard</button>
                </div>
                <textarea
                    placeholder='type your text here...'
                    className={`text-area ${state.darkMode ? 'dark' : 'light'}`}
                    value={state.text}
                    onChange={(e) => { dispatch({ type: 'change', payload: e.target.value }) }}
                />
            </div>
            <div className={`summary ${state.darkMode ? 'dark' : 'light'}`}>
                <h2 style={{ textDecoration: "underline" }}>Summary Of Your Text</h2>
                <div style={{display:"flex", gap:"1rem"}}>
                <p>Number of words : {state.text.trim().split(/\s+/).length}</p>
                <p>Number of characters : {state.text.length}</p>
                <p>Reading Time: {Math.ceil(state.text.trim().split(/\s+/).length / 200)} minute(s)</p>
                </div>
            </div>
            <div className={`preview ${state.darkMode ? 'dark' : 'light'}`}>
                <h2 style={{ textDecoration: "underline" }}>Preview Document</h2>
                <p>{state.text}</p>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            </div>
            <footer className={`footer ${state.darkMode ? 'dark' : 'light'}`}>
                <p>All rights reserved @2024</p>
            </footer>
        </Context.Provider>
    );
}

export default App;
