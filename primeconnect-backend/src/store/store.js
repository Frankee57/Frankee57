/**
 * @typedef {'contact'|'carriere'|'partenaire'|'projet'} SubmissionType
 * @typedef {'nouveau'|'lu'|'traite'|'archive'} SubmissionStatus
 * @typedef {'en_attente'|'confirme'|'annule'|'reporte'} AppointmentStatus
 *
 * @typedef {Object} Submission
 * @property {string} id
 * @property {SubmissionType} type
 * @property {SubmissionStatus} status
 * @property {string|null} pays
 * @property {string|null} source
 * @property {string|null} reference
 * @property {Record<string, unknown>} data
 * @property {string} createdAt
 *
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} nom
 * @property {string} email
 * @property {string|null} societe
 * @property {string} startAt
 * @property {string} fuseau
 * @property {string|null} demande
 * @property {string|null} report
 * @property {string|null} projectReference
 * @property {AppointmentStatus} status
 * @property {string} createdAt
 *
 * @typedef {Object} AvailabilitySlot
 * @property {number} weekday 1 (Monday) through 7 (Sunday)
 * @property {string} start 'HH:MM'
 * @property {string} end 'HH:MM'
 *
 * @typedef {Object} AvailabilityTemplate
 * @property {AvailabilitySlot[]} slots
 * @property {number} slotDurationMinutes
 * @property {string} timezone
 *
 * @typedef {Object} Stats
 * @property {Record<string, number>} submissionsByType
 * @property {Record<string, number>} submissionsByCountry
 * @property {{date: string, count: number}[]} submissionsByDay
 * @property {Record<string, number>} appointmentsByStatus
 *
 * @typedef {Object} Store
 * @property {(input: {type: SubmissionType, pays?: string, source?: string, reference?: string, data: Record<string, unknown>}) => Submission} createSubmission
 * @property {(filter: {type?: SubmissionType, status?: SubmissionStatus, pays?: string, q?: string, from?: string, to?: string, limit?: number, offset?: number}) => {rows: Submission[], total: number}} listSubmissions
 * @property {(id: string) => Submission|null} getSubmission
 * @property {(id: string, status: SubmissionStatus) => Submission|null} updateSubmissionStatus
 * @property {(input: {nom: string, email: string, societe?: string, startAt: string, fuseau: string, demande?: string, report?: string, projectReference?: string}) => Appointment} createAppointment
 * @property {(filter: {status?: AppointmentStatus, from?: string, to?: string}) => Appointment[]} listAppointments
 * @property {(id: string, status: AppointmentStatus) => Appointment|null} updateAppointmentStatus
 * @property {(startAt: string) => boolean} isSlotTaken
 * @property {() => AvailabilityTemplate} getAvailabilityTemplate
 * @property {(template: AvailabilityTemplate) => void} setAvailabilityTemplate
 * @property {() => Stats} getStats
 */

export {};
