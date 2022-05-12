import React from 'react'
import { useSelector } from 'react-redux'
import { usePostDispatch, usePostSelector } from '../redux/app/hooks';

import { Container, Button, Card, Row, Col, Spinner} from 'react-bootstrap'


import { fetchPosts } from '../redux/blog/slice';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

import { Waypoint } from 'react-waypoint';


type PostCardListParamType = {
    count: number;
}

const PostCardList = ({ count }: PostCardListParamType) => {

    const {posts, isFetching} = usePostSelector(state => state.posts);

    const dispatch = usePostDispatch();

    return (
        <Container fluid className="pt-2">
            {posts.map(({ title, summary, createdAt, slug }, idx) => (
                <Row key={idx} className="mt-4">
                        <Link to={`/blog/${slug}`}>
                            <PostCard title={title} createdAt={createdAt} summary={summary} />
                        </Link>
                </Row>
            ))}
            <Button onClick={() => dispatch(fetchPosts(10))} >get all</Button>

            {/* {!isFetching && <Waypoint onEnter={() => dispatch(fetchPosts(10))} />}

                <Row className="text-center pt-2">
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                </Row> */}
        </Container>
    )
}

export default PostCardList