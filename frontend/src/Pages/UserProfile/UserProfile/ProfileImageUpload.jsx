import React from 'react';

const ProfileImageUpload = ({ previewImage, onImageChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onImageChange(file);
    };

    return (
        <div className="profile-image-upload">
            <img src={previewImage || '/default-avatar.png'} alt="Profile Preview" className="profile-preview" />
            <input type="file" accept="image/*" onChange={handleFileChange} className='profile-image-upload-button' />
        </div>
    );
};

export default ProfileImageUpload;
