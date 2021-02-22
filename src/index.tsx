import React from "preact/compat";

const mount = (elementId = 'conce-container') => {
    React.render(
        <div>Conce UI mounted</div>,
        document.getElementById(elementId)
    );
}

if (window) {
    window['Conce'] = {
        mount,
    };
}
