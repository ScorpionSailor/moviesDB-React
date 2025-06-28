const Pagination = ({setCurrentPage , CurrentPage}) => {
  return (
     <div className="page-scroller mt-10">
        <button className='' 
            onClick={()=>{  
            setCurrentPage(prevPage => Math.max(prevPage - 1,1))
            }
        }>prev</button>

        {<p>{CurrentPage}</p>}
        
        <button className='' 
            onClick={() =>{
            setCurrentPage(prevPage => prevPage + 1)
            }
        }>next</button>
    </div>
)
}

export default Pagination