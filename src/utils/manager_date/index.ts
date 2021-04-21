class ManagerDate {

  static get now(): string {
    const now = new Date();

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const day = days[ now.getDay() ];
    const month = months[ now.getMonth() ];

    return `${day}, ${now.getDate()} ${month}`
  }
}

export default ManagerDate