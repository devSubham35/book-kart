"use client";

import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {


    return (
        <Button
            className="w-full flex items-center gap-3"
        >
            <FaGoogle />
            Continue with Google
        </Button>
    );
};

export default SocialLogin;
