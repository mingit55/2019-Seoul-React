import Users from '../../../models/user'

async function isLogin(req, res){
    let uid = typeof req.session.uid !== 'undefined' ? req.session.uid : false;
    let user = await Users.findOne({"idx": uid});
    user = user ? user : false;

    res.status(200).json(user);
}

async function signIn(req, res){
    const {userId, password} = req.body;

    new Users({id: userId}).authenticate(password, (err, result) => {
        if(err || result == false) res.status(200).json({type: "danger", message: "입력 정보와 일치하는 회원을 찾을 수 없습니다."});
        else {
            req.session.user = result;
            res.status(200).json({type: "primary", message: "로그인 되었습니다! 환영합니다!", user: result});
        }
    });
}


async function logout(req, res){
    delete req.session.user;

    res.status(200).json({type: "primary", message: "로그아웃 되었습니다."});
}


export default (req, res) => {
    
    switch(req.method){
        case "GET": isLogin(req, res); break;
        case "POST": signIn(req, res); break;
        case "DELETE": logout(req, res); break;
    }
};  