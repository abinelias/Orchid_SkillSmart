using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class ExtraCurricularActivity : MongoEntity
    {
        /// <summary>
        /// EducationId
        /// </summary>
        [BsonElement("EducationId")]
        public string EducationId { get; set; }

        /// <summary>
        /// Activity
        /// </summary>
        [BsonElement("Activity")]
        public string Activity { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [BsonElement("EndDate")]
        public string EndDate { get; set; }

    }
}
