function Message(name, body, timestamp) {
    this.name = name;
    this.body = body;
    this.timestamp = timestamp;
    this._id = '';
}

export default Message;
