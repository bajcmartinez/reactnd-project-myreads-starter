import React from 'react'

const Loading = (props) => {
    if (props.loading) {
        return <div className="loading">Loading...</div>;
    }
    return <div />;
};

export default Loading