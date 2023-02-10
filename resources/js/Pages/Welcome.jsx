import React from 'react';
import { Link, Head} from '@inertiajs/inertia-react';
import { stardust } from '@eidellev/adonis-stardust/client';

export default function Welcome(props){
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={stardust.route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={stardust.route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Log in
                            </Link>

                            <Link
                                href={stardust.route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
                        <svg width="116" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 36C3.48268 36 0 32.5173 0 18 0 3.48269 3.48268 0 18 0c14.5173 0 18 3.48269 18 18 0 14.5173-3.4827 18-18 18zM12.9043 8.90834L7.25865 21.7393c-.25662.6233-.47658 1.4297-.47658 2.1263 0 3.1894 2.23626 5.4257 5.42563 5.4257 1.0452 0 1.9131-.2746 2.7956-.5538l.0007-.0003c.9125-.2888 1.8406-.5824 2.996-.5824 1.1689 0 2.0748.291 2.9697.5786l.0003.0001c.8732.2806 1.736.5578 2.8222.5578 3.1894 0 5.4257-2.2363 5.4257-5.4257 0-.6966-.22-1.503-.4765-2.1263L23.0958 8.90834C22.1425 6.74541 20.3096 5.5723 18 5.5723c-2.3096 0-4.1426 1.17311-5.0957 3.33604zm-.4766 14.84736L18 11.1447l5.499 12.611c-1.5764-.7699-3.556-1.1365-5.499-1.1365-2.0163 0-3.9226.3666-5.5723 1.1365zm53.38 1.8142c.2232-.1674.4092-.3348.558-.5022V26.1h3.4596V7.96497h-3.4596v6.72393c-.1488-.1674-.3348-.3348-.558-.5022-.2046-.1674-.4464-.3069-.7254-.4185-.2604-.1302-.558-.2325-.8928-.3069-.3162-.0744-.6324-.1116-.9486-.1116-.9114 0-1.7205.1767-2.4273.5301-.7068.3348-1.302.7998-1.7856 1.395-.4836.5952-.8556 1.2834-1.116 2.0646-.2418.7812-.3627 1.6275-.3627 2.5389 0 .8928.1209 1.7391.3627 2.5389.2604.7812.6324 1.4694 1.116 2.0646.4836.5952 1.0788 1.0602 1.7856 1.395.7068.3348 1.5159.5022 2.4273.5022.3162 0 .6324-.0372.9486-.1116.3348-.0744.6324-.1674.8928-.279.279-.1302.5208-.2697.7254-.4185zm-.3906-8.7885c.4278.2604.744.6045.9486 1.0323v4.1013c-.2046.4278-.5208.7812-.9486 1.0602-.4278.2604-.9021.3906-1.4229.3906-.465 0-.8835-.0837-1.2555-.2511-.372-.186-.6882-.4278-.9486-.7254-.2418-.3162-.4371-.6882-.5859-1.116-.1302-.4278-.1953-.8928-.1953-1.395s.0651-.9672.1953-1.395c.1488-.4278.3441-.7905.5859-1.0881.2604-.3162.5766-.5673.9486-.7533.372-.186.7905-.279 1.2555-.279.5208 0 .9951.1395 1.4229.4185zm-12.7725 8.649V26.1h3.3201v-7.9515c0-1.5066-.4557-2.6784-1.3671-3.5154-.9114-.8556-2.2041-1.2834-3.8781-1.2834-.7068 0-1.3578.1023-1.953.3069-.5952.2046-1.1253.4929-1.5903.8649-.4464.3534-.8184.7719-1.116 1.2555-.279.4836-.465 1.0044-.558 1.5624h3.2922c.1302-.372.3441-.6603.6417-.8649.2976-.2046.6975-.3069 1.1997-.3069.6882 0 1.1904.186 1.5066.558.3348.372.5022.8277.5022 1.3671v.9207c-.2604-.186-.6603-.3534-1.1997-.5022s-1.0788-.2232-1.6182-.2232c-.6882 0-1.3299.1023-1.9251.3069-.5766.186-1.0881.4557-1.5345.8091-.4278.3348-.7626.7533-1.0044 1.2555-.2418.4836-.3627 1.023-.3627 1.6182 0 .651.1209 1.2276.3627 1.7298.2418.5022.5673.93.9765 1.2834.4278.3348.9207.5952 1.4787.7812.558.1674 1.1532.2511 1.7856.2511.6882 0 1.3113-.093 1.8693-.279.5766-.2046.9672-.4092 1.1718-.6138zm-.3069-4.0734c.1488.1302.2511.279.3069.4464v.9207c-.0558.1674-.1581.3162-.3069.4464-.1488.1302-.3255.2418-.5301.3348s-.4278.1674-.6696.2232c-.2418.0372-.4836.0558-.7254.0558-.279 0-.5487-.0279-.8091-.0837-.2604-.0558-.5022-.1488-.7254-.279-.2046-.1302-.372-.2883-.5022-.4743-.1116-.186-.1674-.4185-.1674-.6975 0-.2604.0558-.4836.1674-.6696.1302-.2046.2976-.372.5022-.5022.2232-.1302.465-.2232.7254-.279.2604-.0558.5301-.0837.8091-.0837.2418 0 .4836.0279.7254.0837.2418.0372.465.1116.6696.2232.2046.093.3813.2046.5301.3348zm31.4804-1.4787c0 .9486-.1488 1.8228-.4464 2.6226-.2976.7998-.7162 1.488-1.2556 2.0646-.5207.5766-1.1624 1.023-1.925 1.3392-.744.3162-1.5717.4743-2.4831.4743-.9114 0-1.7485-.1581-2.511-.4743-.7441-.3162-1.3857-.7626-1.9251-1.3392-.5208-.5766-.93-1.2648-1.2276-2.0646-.2976-.7998-.4464-1.674-.4464-2.6226 0-.9672.1488-1.8414.4464-2.6226.2976-.7998.7068-1.488 1.2276-2.0646.5394-.5952 1.181-1.0509 1.9251-1.3671.7625-.3162 1.5996-.4743 2.511-.4743.9114 0 1.7391.1581 2.4831.4743.7626.3162 1.4043.7719 1.925 1.3671.5394.5766.958 1.2648 1.2556 2.0646.2976.7812.4464 1.6554.4464 2.6226zm-3.4317 0c0-.5208-.0558-1.0044-.1674-1.4508-.1116-.4464-.2883-.8277-.5301-1.1439-.2232-.3162-.5022-.558-.837-.7254-.3348-.186-.7162-.279-1.1439-.279-.4278 0-.8092.093-1.1439.279-.3348.1674-.6232.4092-.8649.7254-.2232.3162-.3906.6975-.5022 1.1439-.1116.4464-.1675.93-.1675 1.4508s.0559 1.0044.1675 1.4508c.1116.4278.279.7998.5022 1.116.2417.3162.5301.5673.8649.7533.3347.186.7161.279 1.1439.279.4277 0 .8091-.093 1.1439-.279.3348-.186.6138-.4371.837-.7533.2418-.3162.4185-.6882.5301-1.116.1116-.4464.1674-.93.1674-1.4508zm8.6834-6.2496h-3.4596V26.1h3.4596v-7.8957c.0558-.279.1581-.5208.3069-.7254.1488-.2232.3255-.4092.5301-.558.2046-.1488.4278-.2604.6696-.3348.2418-.0744.4929-.1116.7533-.1116.6882 0 1.1997.2046 1.5345.6138s.5022.9393.5022 1.5903V26.1h3.4596v-8.1468c0-1.3764-.3813-2.4831-1.1439-3.3201-.7626-.8556-1.8507-1.2834-3.2643-1.2834-.7068 0-1.3578.1395-1.953.4185-.5952.279-1.0602.6138-1.395 1.0044v-1.1439zM99.2221 26.1V13.6287h3.4599V26.1h-3.4599zm3.7949-16.0704c0 .5952-.205 1.0788-.614 1.4508-.409.3534-.893.5301-1.451.5301-.539 0-1.0138-.1767-1.423-.5301-.4092-.372-.6138-.8556-.6138-1.4508 0-.57663.2046-1.04163.6138-1.39503.4092-.372.884-.558 1.423-.558.558 0 1.042.186 1.451.558.409.3534.614.8184.614 1.39503zm5.62 13.392c-.372-.2232-.623-.5673-.753-1.0323h-3.432c.093.6324.288 1.1997.586 1.7019.316.4836.716.9021 1.199 1.2555.484.3348 1.042.5859 1.674.7533.633.186 1.33.279 2.093.279.707 0 1.376-.093 2.009-.279.632-.186 1.172-.4464 1.618-.7812.465-.3534.828-.7812 1.088-1.2834.26-.5022.391-1.0695.391-1.7019 0-.9486-.279-1.7205-.837-2.3157-.558-.5952-1.386-1.0323-2.483-1.3113l-2.567-.5859c-.391-.093-.679-.2139-.865-.3627-.168-.1674-.251-.372-.251-.6138 0-.3906.167-.6789.502-.8649.353-.2046.735-.3069 1.144-.3069.576 0 1.014.1209 1.311.3627.316.2232.53.5115.642.8649h3.264c-.186-1.1904-.716-2.1297-1.59-2.8179-.874-.6882-2.093-1.0323-3.655-1.0323-.707 0-1.367.1023-1.981.3069-.595.186-1.116.4557-1.562.8091-.447.3534-.8.7812-1.061 1.2834-.241.4836-.362 1.0323-.362 1.6461 0 1.0602.297 1.86.893 2.3994.613.5208 1.395.8928 2.343 1.116l2.511.558c.428.1116.735.2511.921.4185.204.1488.307.3627.307.6417 0 .2046-.047.3906-.14.558-.074.1488-.186.2697-.335.3627-.148.093-.334.1674-.558.2232-.223.0558-.465.0837-.725.0837-.521 0-.967-.1116-1.339-.3348z" fill="#2C2B2A"></path></svg>
                    </div>

                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://laravel.com/docs"
                                            className="underline text-gray-900 dark:text-white"
                                        >
                                            Documentation
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        Laravel has wonderful, thorough documentation covering every aspect of the
                                        framework. Whether you are new to the framework or have previous experience with
                                        Laravel, we recommend reading all of the documentation from beginning to end.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://laracasts.com"
                                            className="underline text-gray-900 dark:text-white"
                                        >
                                            Adocasts
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript
                                        development. Check them out, see for yourself, and massively level up your
                                        development skills in the process.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold">
                                        <a
                                            href="https://laravel-news.com/"
                                            className="underline text-gray-900 dark:text-white"
                                        >
                                            Adonis News
                                        </a>
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        Laravel News is a community driven portal and newsletter aggregating all of the
                                        latest and most important news in the Laravel ecosystem, including new package
                                        releases and tutorials.
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l">
                                <div className="flex items-center">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>

                                    <div className="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-white">
                                        Vibrant Ecosystem
                                    </div>
                                </div>

                                <div className="ml-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        Laravel's robust library of first-party tools and libraries, such as{' '}
                                        <a href="https://forge.laravel.com" className="underline">
                                            Forge
                                        </a>
                                        ,{' '}
                                        <a href="https://vapor.laravel.com" className="underline">
                                            Vapor
                                        </a>
                                        ,{' '}
                                        <a href="https://nova.laravel.com" className="underline">
                                            Nova
                                        </a>
                                        , and{' '}
                                        <a href="https://envoyer.io" className="underline">
                                            Envoyer
                                        </a>{' '}
                                        help you take your projects to the next level. Pair them with powerful open
                                        source libraries like{' '}
                                        <a href="https://laravel.com/docs/billing" className="underline">
                                            Cashier
                                        </a>
                                        ,{' '}
                                        <a href="https://laravel.com/docs/dusk" className="underline">
                                            Dusk
                                        </a>
                                        ,{' '}
                                        <a href="https://laravel.com/docs/broadcasting" className="underline">
                                            Echo
                                        </a>
                                        ,{' '}
                                        <a href="https://laravel.com/docs/horizon" className="underline">
                                            Horizon
                                        </a>
                                        ,{' '}
                                        <a href="https://laravel.com/docs/sanctum" className="underline">
                                            Sanctum
                                        </a>
                                        ,{' '}
                                        <a href="https://laravel.com/docs/telescope" className="underline">
                                            Telescope
                                        </a>
                                        , and more.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4 sm:items-center sm:justify-between">
                        <div className="text-center text-sm text-gray-500 sm:text-left">
                            <div className="flex items-center">
                                <svg
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="-mt-px w-5 h-5 text-gray-400"
                                >
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>

                                <a href="https://laravel.bigcartel.com" className="ml-1 underline">
                                    Shop
                                </a>

                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    className="ml-4 -mt-px w-5 h-5 text-gray-400"
                                >
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>

                                <a href="https://github.com/sponsors/taylorotwell" className="ml-1 underline">
                                    Sponsor
                                </a>
                            </div>
                        </div>

                        <div className="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                            Adonis v{props.adonisVersion} (Node {props.nodeVersion})
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}