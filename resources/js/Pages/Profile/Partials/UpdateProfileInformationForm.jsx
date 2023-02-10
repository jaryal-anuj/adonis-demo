import React, { useRef, useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import { stardust } from '@eidellev/adonis-stardust/client';
import { Inertia } from '@inertiajs/inertia';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;
	const [photoPreview, setPhotoPreview] = useState(null);
	const photoInput = useRef(null);

	console.log(stardust);

    const { data, setData,photo, patch ,errors, processing, recentlySuccessful,transform } = useForm({
        name: user.name,
        email: user.email,
		photo:null
    });
	const selectNewPhoto = () => {
		photoInput.current.click();
	};


	const updatePhotoPreview = () => {
		const photo = photoInput.current.files[0];

		if (! photo) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			setPhotoPreview(e.target.result);
		};

		reader.readAsDataURL(photo);
		setData('photo',photo);

	};

	const deletePhoto = () => {
		Inertia.delete(stardust.route('current-user-photo.destroy'), {
			preserveScroll: true,
			onSuccess: () => {
				setPhotoPreview(null);
				clearPhotoFileInput();
			},
		});
	};

	const clearPhotoFileInput = () => {
		if (photoInput.current.value) {
			console.log(photoInput.current.value);
			photoInput.current.value = null;
		}
	};

    const submit = (e) => {
        e.preventDefault();
        patch(stardust.route('profile.update'));
    };

    return (

        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" noValidate>
				<div>
					<input
						ref={photoInput}
						type="file"
						className="hidden"
						onChange={updatePhotoPreview}
					/>
					<InputLabel for="photo" value="Photo" />
					{!photoPreview && <div className="mt-2">
						<img src={user.profile_photo_url} alt={user.name} className="rounded-full h-20 w-20 object-cover" />
					</div> }

					{photoPreview && <div className="mt-2">
						<span
							className="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
							style={{backgroundImage : `url(${photoPreview})`}}
						/>
                	</div>}
					<SecondaryButton className="mt-2 mr-2" type="button" onClick={selectNewPhoto}>
                    	Select A New Photo
					</SecondaryButton>
					{user.profile_photo_path&&<SecondaryButton
						type="button"
						class="mt-2"
						onClick={deletePhoto}
						>
                    	Remove Photo
                	</SecondaryButton>}
					<InputError message={errors.photo} className="mt-2" />
				</div>
                <div>
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => setData('name', e.target.value)}
                        required
                        autofocus
                        autocomplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData('email', e.target.value)}
                        required
                        autocomplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={stardust.route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
