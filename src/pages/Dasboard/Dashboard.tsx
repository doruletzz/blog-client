import React, { useState } from 'react';
import { Button, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import PostCardList from '../../components/PostCardList';
import { Tag } from '../../redux/blog/types/post';

type TagsType = { [T in Tag]: boolean };

const Dashboard = () => {
	const navigate = useNavigate();
	return (
		<>
			<Button onClick={() => navigate('/post/add')}>new post</Button>
			<PostCardList />
		</>
	);
};

export default Dashboard;
