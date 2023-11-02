import {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/form/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import MySelect from "../components/UI/select/MySelect";
import {UseObserver} from "../hooks/useObserver";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPagesCount(totalCount, limit))
    })

    UseObserver(lastElement, page < totalPages, isPostsLoading, () =>
        setPage(page + 1)
    )

    useEffect(() => {
        fetchPosts();
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Створити пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '20px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="К-сть елементів в списку"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 15, name: '15'},
                    {value: -1, name: 'Всі елементи'}
                ]}
            />
            <PostList remove={removePost} posts={sortedAndSearchPost} title='Список постів'/>
            <div ref={lastElement} />
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            {postError && <h1>Сталась помилка {postError}</h1>}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}

export default Posts;