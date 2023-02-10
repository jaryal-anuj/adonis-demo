import '../css/app.css'

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { initRoutes } from '@eidellev/adonis-stardust/client';
import { InertiaProgress } from '@inertiajs/progress';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Adonis';

createInertiaApp({
    title:(title)=>`${title}- ${appName}`,
    //resolve:(name)=>require(`./Pages/${name}.jsx`),
    //resolve:(name)=>import(`./Pages/${name}.jsx`).then(module=>module.default),
    resolve:(name)=>React.lazy(()=>import(`./Pages/${name}.jsx`)),
    //setup: ({ App, props }) => <App {...props} />,
    setup({el, App, props}){
        //console.log(el, App, props);
        const root = createRoot(el);
        root.render(<App {...props} />);
    }
});
initRoutes();
InertiaProgress.init({ color: '#4B5563' });