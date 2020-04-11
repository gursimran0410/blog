import React,{useReducer} from 'react'
import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'
import { call } from 'react-native-reanimated'
const blogReducer = (state, action)=>{
    switch (action.type){
        case 'get_blogpost':
            return action.payload
        case 'edit_blogpost':
            return state.map((blogPost)=>{
                return blogPost.id === action.payload.id 
                    ? action.payload
                    : blogPost
            })
        case 'delete_blogpost':
            return state.filter((blogPost)=>blogPost.id !== action.payload)
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random()*9999),
                    title: action.payload.title,
                    content: action.payload.content
                }
            ]
        default:
            return state
    }
}
const getBlogPosts = dispatch=>{
    return async()=>{
        const response = await jsonServer.get('/blogPosts')
        dispatch({
            type:'get_blogpost',
            payload: response.data
        })
    }
}
const addBlogPost = (dispatch)=>{
    return(title, content, callback)=>{
        dispatch({type:'add_blogpost',payload:{title,content}})
        callback()
    }
}
const deleteBlogPost = (dispatch)=>{
    return(id)=>{
        dispatch({type:'delete_blogpost',payload:id})
    }
}
const editBlogPost = (dispatch)=>{
    return(id,title,content,callback)=>{
        await jsonServer.post('/blogposts',{title,ocntect})
       // dispatch({
       //     type: 'edit_blogpost',
       //     payload:{id,title,content}
        //})
        if(callback){
            callback()
        }
        
    }
}

export const{Context,Provider} = createDataContext(
    blogReducer,
    {addBlogPost,deleteBlogPost,editBlogPost,getBlogPosts},
    []
)