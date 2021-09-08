import React from "react";
import SocialLogin from "react-social-login";

interface ExtraProps {
  triggerLogin?: () => void;
}

type Props = Readonly<{}> &
  Readonly<{ children?: React.ReactNode }> &
  ExtraProps;

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props }: Props = this.props;
    return (
      <button onClick={triggerLogin} {...props}>
        {children}
      </button>
    );
  }
}

export default SocialLogin(SocialButton);
