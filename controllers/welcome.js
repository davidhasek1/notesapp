exports.getWelcomePage = (req,res,next) => {
    res.render('welcomepage', 
    {
        title:'NODES APP',
    }
    
    );
};

//tlačítko na welcomu
exports.getRedirect = (req,res, next) =>{
    res.redirect('/addnote');
}