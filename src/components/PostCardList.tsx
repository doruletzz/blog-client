import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePostDispatch, usePostSelector } from '../redux/app/hooks';

import {
	Container,
	Button,
	Card,
	Row,
	Col,
	Spinner,
	Form,
	FormCheck,
	ToggleButton,
} from 'react-bootstrap';

import { fetchPosts, removePost } from '../redux/blog/slice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import PostCard from './PostCard';

import { Waypoint } from 'react-waypoint';
import { Tag } from '../redux/blog/types/post';

const PostCardList = () => {
	const navigate = useNavigate();

	const { posts, isFetching } = usePostSelector((state) => state.posts);

	const dispatch = usePostDispatch();

	useEffect(() => {
		dispatch(fetchPosts(10));
	}, []);

	return (
		<Container fluid className='pt-2'>
			{posts.map(({ id, title, summary, createdAt, slug, tags }, idx) => (
				<Row key={idx} className='mt-4'>
					<Col>
						<PostCard
							tags={tags}
							slug={slug}
							title={title}
							createdAt={createdAt}
							summary={summary}
						/>
					</Col>
					<Col md={2}>
						<Button onClick={() => dispatch(removePost(id))}>
							❌
						</Button>
						<Button onClick={() => navigate(`/post/edit/${id}`)}>
							⚙️
						</Button>
					</Col>
				</Row>
			))}

			{/* {!isFetching && <Waypoint onEnter={() => dispatch(fetchPosts(10))} />} */}
			{/*
                <Row className="text-center pt-2">
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                </Row> */}
		</Container>
	);
};

export default PostCardList;
