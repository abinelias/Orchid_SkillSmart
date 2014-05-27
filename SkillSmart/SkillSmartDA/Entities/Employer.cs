using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Employer : MongoEntity
    {
        /// <summary>
        /// CompanyId
        /// </summary>
        [BsonElement("CompanyId")]
        public string CompanyId { get; set; }
        
        /// <summary>
        /// FirstName
        /// </summary>
        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        /// <summary>
        /// LastNmae
        /// </summary>
        [BsonElement("LastNmae")]
        public string LastNmae { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [BsonElement("Email")]
        public string Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [BsonElement("Password")]
        public string Password { get; set; }

        /// <summary>
        /// Permission
        /// </summary>
        [BsonElement("Permission")]
        public string Permission { get; set; }

    }
}

