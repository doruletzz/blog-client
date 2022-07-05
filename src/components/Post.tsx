import { useEffect, useState } from 'react';
import { usePostDispatch, usePostSelector } from '../redux/app/hooks';
import { useParams } from 'react-router';
import { fetchPost } from '../redux/blog/slice';
import Markdown from 'marked-react';

import { Container, Col, Row } from 'react-bootstrap';

const PostContainer = () => {
	const dispatch = usePostDispatch();
	const { slug } = useParams();
	const { posts, isFetching, isError, error } = usePostSelector(
		(state) => state.posts
	);

	const [post, setPost] = useState(posts.find((post) => post.slug === slug));

	const loadPost = async () => {
		slug && dispatch(fetchPost(slug));
		console.log(slug, post);
		setPost(posts.find((post) => post.slug === slug));
	};

	useEffect(() => {
		if (!post) {
			loadPost();
		}
	}, [posts, slug]);

	return (
		<div>
			{post ? (
				<Container fluid>
					<Row>
						<Col lg={4} md={12} xs={12}>
							<h1>{post.title}</h1>
							{post.updatedAt ? (
								<h4>{post.updatedAt}</h4>
							) : (
								post.createdAt && <h4>{post.createdAt}</h4>
							)}
							{post.summary && <h4>{post.summary}</h4>}
							{post.user && <h4>{post.user}</h4>}
						</Col>
						<Col>
							<Markdown>{post.content}</Markdown>
						</Col>
					</Row>
				</Container>
			) : (
				<h4>it's fetching</h4>
			)}
		</div>
	);
};

export default PostContainer;
