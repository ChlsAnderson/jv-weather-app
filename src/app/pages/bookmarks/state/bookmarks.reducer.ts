import { createReducer, Action } from "@ngrx/store";

import { Bookmark } from 'src/app/shared/models/bookmarks.model';

import * as fromHomeActions from '../../home/state/home.actions';
import * as fromBookmarksActions from '../../bookmarks/state/bookmarks.action';

export interface BookmarksState {
    list: Bookmark[];
}

export const bookmarkInitialState: BookmarksState = {
    list: [],
};

const reducer = createReducer(
    bookmarkInitialState,
    on(fromHomeActions.toggleBookmark, (state, { entity }) => ({
        ...state,
        list: toggleBookmark(state.list,entity),
    })),
    on(fromBookmarksActions.removeBookmark, (state, { id }) => ({
        list: state.list.filter(b => b.id !== id),
    }))
);

export function bookmarkReducer(state: BookmarksState | undefined, action: Action){
    return reducer(state,action);
}

function toggleBookmark(list: Bookmark[], entity: Bookmark): Bookmark[] {
    if (!!list.find(bookmark => bookmark.id === entity.id)) {
        return list.filter(bookmark => bookmark.id !== entity.id)
    }
    return [...list,entity];
}