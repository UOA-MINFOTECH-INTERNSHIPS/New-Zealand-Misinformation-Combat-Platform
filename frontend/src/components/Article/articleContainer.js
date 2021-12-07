

export default function articleContainer (props){
    const article = {
        title: 'I dunno what the name is',
        description: 'I dunno because the database is not fully complete and I dunno how to call from backend yet',
        articleImg: './component/Image/background.jpg',
        author: 'Linda',
        pubDate: '12/03/2021'
    }
    return (
        <div className='articleContainer'>
            <div className='articleContent'>  
                <h4>{article.title}</h4>
                <p>
                    {article.description}<br/>
                    {article.author}<br/>
                    {article.pubDate}
                </p>
            </div>
        </div>
    )
}