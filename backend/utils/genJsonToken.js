import jwt from 'jsonwebtoken';



 const genJsonToken = (id,res) => {
    const jwtToken= jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d',
    });

    res.cookie("jwt", jwtToken, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
	});
}

export default genJsonToken;