// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    constructor() {}

    struct Post {
        address posterAddress;
        string ipfsLink;
    }

    Post[] posts;
    event PostAppended(Post _newPost, Post[] _allPosts);

    function post(Post calldata _newPost) external {
        posts.push(
            Post({
                posterAddress: _newPost.posterAddress,
                ipfsLink: _newPost.ipfsLink
            })
        );
        emit PostAppended(_newPost, posts);
    }

    function allPosts() external view returns (Post[] memory) {
        return posts;
    }
}
