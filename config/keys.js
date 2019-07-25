module.exports = {
    mongoURI : "mongodb+srv://autouser:autouser@db360-9nv8q.mongodb.net/autoDB?retryWrites=true&w=majority",
    clientOrigin : process.env.NODE_ENV === 'production' ? 'https://auto360x.com' : 'http://localhost:3000',
    cloudinary : {cloud_name: "auto360x", 
    api_key: "671755859622817", 
    api_secret: "8uU3X_xD3xqErS0Jnx7gnrcK7aU"},
    carmakemodeldb : { Tocken : "1gGosHOuHCXRCadP8Rl0rHnAQB6hpsVurQS7OPgcuY2ygduXPctXPKnoU46g" }, 
    userRoles : {sadmin: "Super Admin", admin: "Administrator",individual: "Individual",
    dealer : "Dealer",anonoymous :"Anonymous"},
    jwtSecret : "Auto360xjwt"
}

