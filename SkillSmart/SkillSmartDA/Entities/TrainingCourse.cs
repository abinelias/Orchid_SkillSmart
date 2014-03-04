using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class TrainingCourse : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// ProgramTypeId
        /// </summary>
        [BsonElement("ProgramTypeId")]
        public string ProgramTypeId { get; set; }

        /// <summary>
        /// Focus
        /// </summary>
        [BsonElement("Focus")]
        public string Focus { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [BsonElement("InstitutionName")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// CompletionDate
        /// </summary>
        [BsonElement("CompletionDate")]
        public string CompletionDate { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [BsonElement("CurrentlyEnrolled")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// TrainingDetails
        /// </summary>
        [BsonElement("TrainingDetails")]
        public string TrainingDetails { get; set; }

        /// <summary>
        /// Contact
        /// </summary>
        [BsonElement("Contact")]
        public string Contact { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [BsonElement("Email")]
        public string Email { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [BsonElement("Phone")]
        public string Phone { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [BsonElement("Address")]
        public string Address { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [BsonElement("City")]
        public string City { get; set; }

        /// <summary>
        /// Website
        /// </summary>
        [BsonElement("Website")]
        public string Website { get; set; }

    }
}
