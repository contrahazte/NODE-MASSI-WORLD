function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  async function getingResults() {
    const players = ["Tina", "Jorge", "Julien"];
  
    try {
      const results = await Promise.all(
        players.map((player) =>
          luckyDraw(player)
            .then((result) => result)
            .catch((error) => error.message)
        )
      );
  
      results.forEach((result) => console.log(result));
    } catch (error) {
      console.error("Error in drawing:", error.message);
    }
  }
  
  getingResults();
