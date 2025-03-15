import typer
from agentx.scraper import scrape_website
import subprocess
import time

app = typer.Typer()

@app.command()
def optimize():
    typer.echo("Running SEO Optimization and Performance Monitoring...")

@app.command()
def scrape():

    url = typer.prompt("Enter the website URL")

    typer.echo("Ensuring Playwright browsers are installed...")
    try:
        subprocess.run(["python3", "-m", "playwright", "install"], check=True)
    except subprocess.CalledProcessError as e:
        typer.echo("Failed to install Playwright dependencies.")
        raise e

    try:
        process = subprocess.Popen(["python3", "api.py"],
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
    except Exception as e:
        typer.echo(f"Failed to start the API server: {e}")
        raise e

    time.sleep(2)
    
    typer.echo("Flask API server started in the background.")
    typer.echo(f"Access the scraped JSON at: http://127.0.0.1:5000/scrape?url={url}")
    typer.echo("Press Ctrl+C to exit and stop the API server.")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        typer.echo("Exiting CLI and terminating API server...")
        process.terminate()
        process.wait()

   

@app.command()
def fix_errors():
    typer.echo("Fixing errors based on GPT suggestions...")

@app.command()
def generate_content():
    typer.echo("Generating new content using GPT...")

if __name__ == "__main__":
    app()
