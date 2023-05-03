import React, {FC} from "react";
import { connect, useSelector } from "react-redux";
import { follow, unfollow, getUsers, FilterType } from "../../redux/users-reducer";
import axios from "axios";
import Preloader from "../common/preloader/Preloader";

import { usersAPI } from "../../api/users-api";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersFilter, getUsersSelector } from "../../redux/users-selectors";
import { getStatus } from "../../redux/profile-reducer"; 
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { Users } from "./Users";

// type MapStatePropsType = {
//     currentPage: number
//     pageSize: number
//     isFetching: boolean
//     totalUsersCount: number
//     users: Array<UsersType>
//     followingInProgress: Array<number>
//     filter: FilterType
// }

// type MapDispatchPropsType = {
//     unfollow: (userid: number) => void
//     follow: (userid: number) => void
//     getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
// }

// type OwnPropsType = {
//     pageTitle: string
// }

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;


type UsersPagePropsType = {
    pageTitle: string
}


export const UsersPage: FC<UsersPagePropsType> = (withAuthRedirect, props) => {

    const isFetching = useSelector(getIsFetchingSelector)

    return <>
    <h2>{props.pageTitle}</h2>
    {isFetching ? <Preloader/> : null}
     <Users //totalUsersCount={this.props.totalUsersCount} 
            //pageSize={this.props.pageSize}
            //currentPage={this.props.currentPage}
            //onPageChanged={onPageChanged}
            //onFilterChanged={onFilterChanged}
            //users={props.users}
            //follow={props.follow}
            //unfollow={props.unfollow}
            //followingInProgress={props.followingInProgress}
/>
</>
}






// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }




// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
 
//     return {
//         users: getUsersSelector(state),
//         pageSize: getPageSizeSelector(state),
//         totalUsersCount: getTotalUsersCountSelector(state),
//         currentPage: getCurrentPageSelector(state),
//         isFetching: getIsFetchingSelector(state),
//         followingInProgress: getFollowingInProgressSelector(state),
//         filter: getUsersFilter(state)
//     }
// }


/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userid) => {
            dispatch(followAC(userid));
        },
        unfollow: (userid) => {
            dispatch(unfollowAC(userid));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}*/





// export default compose<React.ComponentType>(
//     withAuthRedirect,
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
//         {follow, unfollow, 
//             // setCurrentPage,   
//             // toggleFollowingProgress, 
//             getUsers
//         })
// )(UsersContainer);