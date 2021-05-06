import * as api from "../api/index.js";

export const getReplies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReplies();
    dispatch({ type: "FETCH_REPLIES", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createReply = (reply) => async (dispatch) => {
  try {
    const { data } = await api.createReply(reply);
    dispatch({ type: "CREATE_REPLY", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateReply = (id, reply) => async (dispatch) => {
  try {
    const { data } = await api.updateReply(id, reply);
    dispatch({ type: "UPDATE_REPLY", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReply = (id) => async (dispatch) => {
  try {
    await api.deleteReply(id);
    dispatch({ type: "DELETE_REPLY", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteChildren = (parentId) => async (dispatch) => {
  try {
    await api.deleteChildren(parentId);
    dispatch({ type: "DELETE_CHILDREN", payload: parentId });
  } catch (error) {
    console.log(error);
  }
};
