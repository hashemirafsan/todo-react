const uuidv1 = require('uuid/v1');

export default function host() {
    const storage = window.localStorage;
    const hostKey = '_react_to_do_graphql';
    const getHost = storage.getItem(hostKey)
    if ( getHost ) {
        return getHost;
    } else {
        storage.setItem(hostKey, uuidv1());
        return storage.getItem(hostKey);
    }
}