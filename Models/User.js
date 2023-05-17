const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 1,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
    },
    slug: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        unique: true,
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: false,
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    }
    ,
    password: {
        type: String,
        required: true,
    },

    externalLink: {
        type: mongoose.Schema.Types.Mixed,
    },

    admin: {
        type: Boolean,
        default: false
    },

    avatar: {
        type: String,
        default: "/9j/4AAQSkZJRgABAQAAAQABAAD/4QBaRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA2aADAAQAAAABAAAA3wAAAAAAAP/bAEMACQYHCAcGCQgHCAoKCQsNFg8NDAwNGxQVEBYgHSIiIB0fHyQoNCwkJjEnHx8tPS0xNTc6OjojKz9EPzhDNDk6N//bAEMBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAN8A2QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIFBgQDB//EADIQAQABAwIEBAQFBAMAAAAAAAABAgMRBDEFEiFRIkFxkhMVU2EyMzRygRQkQlKRoaL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP0QBpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOu0dZaGl4VcuxzX6uSO0bgz8wZh0Nrh2ntx+Dm9X1jT2Po0+0o5nJu6SvRaeqMTZp/h49RwiiqJmzOPtJRji9y1XYqmi5RyyoAAAAAAAAAAAAAAAAAAAD0aCz/UaiKY6xHWQaHCtDy0xevRmudmnG5EYjER0jollUgAIlIDzarS0am3NNUdfKXPXrddm5NFXk6llcZsZoi9EY5d1GQH3FQAAAAAAAAAAAAAAAAavArf5lyfPZleTc4LH9nHfKDRARQAAAES+Ostxc01ymez7q1RmmYnzgHKR27C1yIi7XEeUqtIAAAAAAAAAAAAAAAANzgn6T+WG1eB3YxXbzt1RWwIzCUAAAABFXSJmUvPrbkW9NcqmcdMA5yuc3rk95lU67yNIAAAAAAAAAAAAAAAATs+2jvTp9RRXG20viA6umqKoiqPNZjcJ1sUR8C9V+2WxmGVSIicpABGYAnZj8a1HWizROe73a3VU6eifF452hz1dddy5NdW8rmCOvmAqAAAAAAAAAAAAAAAAAAG7Q0XFKrUcmo8VMbVM8xkHTWdRauxE0V0y+2Y3cnETGy3xLkRiLtfuSK6iqummM1VYeDU8Vt0RNNnxVsWqqqqMVTn1qRiI26EFrty5er57k9VQaxABAAAAAAAAAAAAAAAMwvatV36uS1GZa2l4VboxXf8dfbyBlWrNy9+XRVP8A09dvhN+vrVy0tummKelMYj7JjdKrIjg1fnex6LfJp+vV7WuFGR8mn69XtPk0/Xq9rXCjI+TT9er2nyafr1e1rhRjzwaryvf+Xzq4PeiM03KZbiJ6lHNXtFqLX4qMx9nwnp0no6ucvNqdDZ1EeKjE94KOdHp1miuaac8uaO7zKgAAAAAAAAAA+2n09eouRRR7nxiJmeWneXRaDS06a1EcvjneTRfS6WjTW+SiPWe77wlGYZVIjMGYBIhIAhIAIBIIzAJROxmDMArXTTVTNNcZiWHxDQTYnntdbfbs3p/5VqopqpmmqMxIOV8sj067TTpr0x/hVs8zSAAAAAAAE7A0OEWIu3vi1R0phtZ6vLwy1FrR0R36vQmqtkzCogtmDMKgLZMqgLZMqgLZMqgLZMwqAtmDMKgLZM91QHn4nYi/p5mN4YGOno6iesY79HNaij4V+5R91xHzAUAAAADGZiPuJjePWAdHZ8NmintC+VKZ8EeiQWyZVIBbJlGYMwCcmUZgkE5MqkAtkyiUAtkyqAtkyqAtkyqgF8sTitPLq5nvGWyyOL/qo/YDwgAAAAAHnHrAA6On8uJ+xl8NDdm5p4zvEPuBkyAGTIAZMgBkyAGTIAZMgBkyAGTIAZZPFpidTGP9GrM4jPZhau5N3UV1/wAA+QAAAP/Z"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
