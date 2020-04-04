import React from 'react'

const BlogContext = React.createContext()

export const BlogProvider = ({children})=>{
    const BlogPost = [
        {title:'Blog Post #1'},{title:'Blog Post #2'}]
    return(
        <BlogContext.Provider value={15}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext