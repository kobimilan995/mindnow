import React, {useState} from "react";

export const NewIngredientPage = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    return (
        <form className="mt-4">
            <div className="form-group">
                <label htmlFor="name-input">Ingredient name</label>
                <input type="input" className="form-control" id="name-input" placeholder="Enter name"/>
            </div>
            <div className="form-group">
                <label htmlFor="calories-count-input">Calories count</label>
                <input type="number" className="form-control" id="calories-count-input" placeholder="Enter calories count"/>
            </div>
            <div className="form-group">
                <label htmlFor="image-url-input">Image URL</label>
                <input type="input" className="form-control" id="image-url-input" placeholder="Enter image url"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}