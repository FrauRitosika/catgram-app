import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Gallery from './Gallery';
import ImagePage from './ImagePage';
import Header from './Header';
import Footer from './Footer';
import { PostContent } from '../app-data/types';
import './App.css';

interface DataApp {
    loadGallery: () => Promise<PostContent[]>;
    changePost: (post: PostContent) => void;
    getPost: (id: string) => PostContent | null;
}

const App: React.FC<DataApp> = ({ loadGallery, changePost, getPost }) => {

    const navigate = useNavigate();
    const [post, openPost] = useState<PostContent>();

    const handleOpenPost = (postId: string, post?: PostContent) => {
        navigate(`/image/${postId}`);
        if (post) { openPost(post) };
    };

    const handleOpenHome = () => {
        navigate('/');
    }

    return (
        <div className='app'>
            <Header className='app__header' />
            <main className='app__main'>
                <div className='app__content-container'>
                    <h1 className='title--level-1'>Catgram</h1>
                    {<Routes>
                        <Route path='/image/:postId' element={
                            <ImagePage post={post} getPost={getPost} back={handleOpenHome} changePost={changePost} />
                        } />
                        <Route path='/' element={
                            <Gallery loadGallery={loadGallery} cardClick={handleOpenPost} changePost={changePost} >
                                <h2 className='title--level-2'>Gallery</h2>
                            </Gallery>
                        } />
                    </Routes>}

                </div>
            </main>
            <Footer className='app__footer' />
        </div>
    );

};

export default App;