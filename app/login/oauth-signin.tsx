"use client";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Provider } from "@supabase/supabase-js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@/components/ui/button";


import { config } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { oAuthSignIn } from './actions';
config.autoAddCss = false; // Prevent Font Awesome from adding its CSS since we are importing it directly

// Type for all oauth providers
type OAuthProvider = {
    name: Provider;
    displayName: string;
    icon?: JSX.Element;
}

export function OAuthButtons() {
    // const {
    //     data: { publicUrl },
    //   } = await supabase.storage.from('public_bucket').getPublicUrl('logo.PNG')
    const oAuthProviders: OAuthProvider[] = [{
        name: "google",
        displayName: "Google",
        icon: <FontAwesomeIcon icon={faGoogle} />
    }]

    return (
        <>
            {oAuthProviders.map((provider) => (
                <Button
                    className="w-full flex items-center justify-center gap-2"
                    variant="outline"
                    onClick={async () => {
                        await oAuthSignIn(provider.name);
                    }}
                >
                    {provider.icon}
                    Login with {provider.displayName}
                </Button>
            ))}
        </>
    );

}
