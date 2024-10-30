
const URL = window.location.port == "3000" ? "http://localhost:8000" : "";

async function CreateNewIssue(title, description, status, priority) 
{
    try {
        const response = await fetch(`${URL}/issues`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set Content-Type header
            },
            body: JSON.stringify({
                title,
                description,
                status,
                priority
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}


async function ListAllIssue() 
{
    try {
        const response = await fetch(`${URL}/issues`, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) { 
        console.error(error.message);
    }

}


async function UpdateIssueDetail(id, title, description, status, priority) 
{
    try {
        const response = await fetch(`${URL}/issues/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" // Set Content-Type header
            },
            body: JSON.stringify({
                title,
                description,
                status,
                priority
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function GetIssueDetail(id) 
{
    try {
        const response = await fetch(`${URL}/issues/${id}`, {method: "GET"});
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}


async function DeleteIssue(id) 
{
    try {
        const response = await fetch(`${URL}/issues/${id}`, {method: "DELETE"});
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

export { CreateNewIssue, ListAllIssue, GetIssueDetail, UpdateIssueDetail, DeleteIssue };