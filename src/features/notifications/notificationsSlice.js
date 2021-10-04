import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        return response.data
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            //debugger;
            Object.values(state.entities).forEach(notification => {
                notification.read = true
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            //state.push(...action.payload)
            // Sort with newest first

            Object.values(state.entities).forEach(notification => {        // Any notifications we've read are no longer new       
                notification.isNew = !notification.read
            })
            //state.sort((a, b) => b.date.localeCompare(a.date))
            notificationsAdapter.upsertMany(state, action.payload)
        }
    }
})

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

// export const selectAllNotifications = state => state.notifications

export const {
    selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)