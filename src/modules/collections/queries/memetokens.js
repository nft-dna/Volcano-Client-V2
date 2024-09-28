import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getMemeTokens(pagination = { first: 5000 }, search = null, mintableBy = null) {
    const query = {
        query: gql`
            query GetMemeTokens(
                $search: String
                $mintableBy: Address
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                memeTokens(
                    search: $search
                    mintableBy: $mintableBy
                    first: $first
                    after: $after
                    last: $last
                    before: $before
                ) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            contract
                            name
                            image
                        }
                    }
                }
            }
        `,
        variables: {
            search,
            mintableBy,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'memetokens');
}

export async function getMemeTokensMod(pagination = { first: 5000 }, search = null, mintableBy = null) {
    const query = {
        query: gql`
            query GetMemeTokens(
                $search: String
                $mintableBy: Address
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                memeTokens(
                    search: $search
                    mintableBy: $mintableBy
                    first: $first
                    after: $after
                    last: $last
                    before: $before
                ) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            contract
                            name
                            image
                            description
                            ownerUser {
                                address
                                username
                                avatar
                            }
                            feeRecipientUser {
                                address
                                username
                                avatar
                            }
                            royalty
                            site
                            twitter
                            telegram
                            discord
                            medium
                            instagram
                            createdTime
                            changedTime
                        }
                    }
                }
            }
        `,
        variables: {
            search,
            mintableBy,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'memetokens');
}

export async function getBannedMemeTokens(pagination = { first: 5000 }, search = null) {
    const query = {
        query: gql`
            query GetBannedMemeTokens($search: String, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                bannedMemeTokens(search: $search, first: $first, after: $after, last: $last, before: $before) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            contract
                            name
                            image
                            description
                            ownerUser {
                                address
                                username
                                avatar
                            }
                            feeRecipientUser {
                                address
                                username
                                avatar
                            }
                            royalty
                            site
                            twitter
                            telegram
                            discord
                            medium
                            instagram
                            createdTime
                            changedTime
                        }
                    }
                }
            }
        `,
        variables: {
            search,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'bannedMemeTokens');
}

export async function getMemeTokensInReview(pagination = { first: 5000 }, search = null) {
    const query = {
        query: gql`
            query GetMemeTokensInReview($search: String, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                memetokensInReview(search: $search, first: $first, after: $after, last: $last, before: $before) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            contract
                            name
                            image
                            description
                            ownerUser {
                                address
                                username
                                avatar
                            }
                            feeRecipientUser {
                                address
                                username
                                avatar
                            }
                            royalty
                            site
                            twitter
                            telegram
                            discord
                            medium
                            instagram
                            createdTime
                            changedTime
                        }
                    }
                }
            }
        `,
        variables: {
            search,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'memetokensInReview');
}
