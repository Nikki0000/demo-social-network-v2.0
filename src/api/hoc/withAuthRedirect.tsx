import React from "react"
import { Navigate } from "react-router-dom"
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";



let mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsforRedirectPropsType => ({
    isAuth: state.auth.isAuth
});

type mapStateToPropsforRedirectPropsType = {
    isAuth: boolean
}


export function withAuthRedirect(Component: React.ComponentType<mapStateToPropsforRedirectPropsType>)  {
    class redirectComponent extends React.Component<mapStateToPropsforRedirectPropsType> {
        render() {

        
        if(!this.props.isAuth) {
            return <Navigate to={'/login'} />
        }
        return <Component {...this.props} />
    }
    }

    
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(redirectComponent);
    
    return ConnectedAuthRedirectComponent;

}

