const Paginate = ({totalPosts, postPerPage, setCurrentPage, currentPage}) => {
  const pages = []

  const numOfPages = Math.ceil( totalPosts/postPerPage)

  for (let i= 1; i <= numOfPages; i++) {
       pages.push(i)
  }
   

    return (
        <div className={`flex justify-center`}>
          {
            pages.map((page, index) => {
              return( 
              <button 
                className={page === currentPage ? "bg-[#181818] w-auto py-0 px-2 rounded-md text-[#fff] ml-3" : "w-auto py-0 px-2 rounded-md bg-[#2ECF5A] ml-3"}
                key={index}
                onClick={() => setCurrentPage(page)}>
                  {page}</button>
              )
            })
          }
        </div>
      
    )
}
export default Paginate;