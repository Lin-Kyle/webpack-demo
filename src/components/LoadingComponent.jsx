import React from 'react';
import ReactDOM from 'react-dom';

export default function MyLoadingComponent({error, pastDelay}) {
        if (error) {
                return <div>Error!</div>;
        } else if (pastDelay) {
                return <div>Loading...</div>;
        } else {
                return null;
        }
}
