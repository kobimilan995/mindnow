import React, {useState} from "react";
import {Ingredient} from "../types/Ingredient";

type Props = {
    onFormSubmit(ingredient: Omit<Ingredient, 'id'>): void;
    isSubmitDisabled: boolean;
}

export const CreateAndEditIngredientForm = ({onFormSubmit, isSubmitDisabled}: Props) => {

    const [imageUrl, setImageUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [caloriesCount, setCaloriesCount] = useState<number>(0);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>('');

    const removeTag = (index: number) => {
        const tagsCopy = [...tags];
        tagsCopy.splice(index, 1);
        setTags(tagsCopy);
    }

    // @ts-ignore
    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTags([...tags, currentTag]);
            setCurrentTag('');
        } else {
            e.preventDefault();
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        onFormSubmit({
            image: imageUrl,
            name,
            caloriesCount,
            tags
        });
    }
    return (
        <div className="mt-4">
            <div className="form-group">
                <label htmlFor="name-input">Ingredient name</label>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    type="input"
                    className="form-control"
                    id="name-input"
                    placeholder="Enter name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="calories-count-input">Calories count</label>
                <input
                    value={caloriesCount}
                    onChange={(e) => {
                        setCaloriesCount(parseInt(e.target.value, 10));
                    }}
                    type="number"
                    className="form-control"
                    id="calories-count-input"
                    placeholder="Enter calories count"
                />
            </div>
            <div className="form-group">
                <label htmlFor="image-url-input">Image URL</label>
                <input
                    value={imageUrl}
                    onChange={(e) => {
                        setImageUrl(e.target.value);
                    }}
                    type="input"
                    className="form-control"
                    id="image-url-input"
                    placeholder="Enter image url"
                />
            </div>
            <div>
                <span className="mr-3">Tags:</span>
                {tags.map((tag, index) => {
                    return (
                        <div key={tag}>
                            <span className="badge badge-secondary mr-1 font-weight-bold">
                                {tag}
                                <a style={{color: 'white'}} href="/#" className="btn-link ml-3" onClick={(e) => {
                                    e.preventDefault();
                                    removeTag(index);
                                }}>X</a>
                            </span>
                        </div>
                    )
                })}
            </div>
            <div className="form-group">
                <label htmlFor="tags-input">Enter tag name and press enter (you can add more then 1)</label>
                <input
                    value={currentTag}
                    onChange={(e) => {
                        setCurrentTag(e.target.value);
                    }}
                    onKeyUp={onKeyUp}
                    type="input"
                    className="form-control"
                    id="tags-input"
                    placeholder="Enter tag name"
                />
            </div>
            <button disabled={isSubmitDisabled} type="submit" onClick={onSubmit}
                    className="btn btn-primary">Submit
            </button>
        </div>
    );
}