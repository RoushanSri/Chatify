import React from 'react'
import GroupBox from './GroupBox'
import UserBox from './UserBox'

function SideBar({groupS, currentGroup, setCurrentUser, setCurrentGroup, currentUser, friends}) {
  return (
    <>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-100 mb-1">
              Groups
            </h3>
            <div className="flex flex-col gap-2">
              {Array.isArray(groupS) && groupS.length > 0 ? (
                groupS.map((group) => (
                  <GroupBox
                    key={group._id}
                    group={group}
                    currentGroup={currentGroup}
                    setCurrentGroup={setCurrentGroup}
                    setCurrentUser={setCurrentUser}
                  />
                ))
              ) : (
                <p className="text-sm text-teal-200 italic">No groups yet</p>
              )}
            </div>
          </div>

          <hr className="border-teal-400 opacity-30" />

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-100 mb-1">
              Friends
            </h3>
            <div className="flex flex-col gap-2">
              {Array.isArray(friends) && friends.length > 0 ? (
                friends.map((user) => (
                  <UserBox
                    key={user._id}
                    user={user}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setCurrentGroup={setCurrentGroup}
                  />
                ))
              ) : (
                <p className="text-sm text-teal-200 italic">No friends yet</p>
              )}
            </div>
          </div>
        </>
  )
}

export default SideBar
