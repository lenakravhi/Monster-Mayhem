using UnityEngine;

public class Character : Unit
{
    [SerializeField]
    private int lives = 5;

    public int Lives
    {
        get { return lives; }
        set
        {
            // Перевіряємо, щоб значення життів було не більше 5
            if (value < 5)
                lives = value;

            livesBar.Refresh();
        }
    }
    private LivesBar livesBar;

    [SerializeField]
    private float speed = 3.0f;
    [SerializeField]
    private float jumpForce = 15.0f;

    private bool isGrounded = false;

    private Bullet bullet;

    private CharState State
    {
        get { return (CharState)animator.GetInteger("State"); }
        set { animator.SetInteger("State", (int)value); }
    }

    new private Rigidbody2D rigidbody;
    private Animator animator;
    private SpriteRenderer sprite;

    // Підключення компонентів та завантаження снаряду
    private void Awake()
    {
        livesBar = FindObjectOfType<LivesBar>();
        rigidbody = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        sprite = GetComponentInChildren<SpriteRenderer>();

        bullet = Resources.Load<Bullet>("Bullet");
    }

    // Оновлення стану героя
    private void FixedUpdate()
    {
        CheckGround();
    }

    // Обробка введення користувача
    private void Update()
    {
        if (isGrounded)
            State = CharState.Idle;

        if (Input.GetButtonDown("Fire1"))
            Shoot();
        if (Input.GetButton("Horizontal"))
            Run();
        if (isGrounded && Input.GetButtonDown("Jump"))
            Jump();
    }

    // Рух героя
    private void Run()
    {
        Vector3 direction = transform.right * Input.GetAxis("Horizontal");

        transform.position = Vector3.MoveTowards(transform.position, transform.position + direction, speed * Time.deltaTime);

        sprite.flipX = direction.x < 0.0f;

        if (isGrounded)
            State = CharState.Run;
    }

    // Перескок героя
    private void Jump()
    {
        rigidbody.AddForce(transform.up * jumpForce, ForceMode2D.Impulse);
    }

    // Вистріл героя
    private void Shoot()
    {
        Vector3 position = transform.position;
        position.y += 0.8f;
        Bullet newBullet = Instantiate(bullet, position, bullet.transform.rotation) as Bullet;

        newBullet.Parent = gameObject;
        newBullet.Direction = newBullet.transform.right * (sprite.flipX ? -1.0f : 1.0f);
    }

    // Обробка отримання пошкоджень
    public override void ReceiveDamage()
    {
        Lives--;

        rigidbody.velocity = Vector3.zero;
        rigidbody.AddForce(transform.up * 8.0f, ForceMode2D.Impulse);

        Debug.Log(lives);
    }

    // Перевірка землі під героєм
    private void CheckGround()
    {
        Collider2D[] colliders = Physics2D.OverlapCircleAll(transform.position, 0.3f);

        isGrounded = colliders.Length > 1;

        if (!isGrounded)
            State = CharState.Jump;
    }

    // Обробка зіткнення зі снарядом
    private void OnTriggerEnter2D(Collider2D collider)
    {
        Bullet bullet = collider.gameObject.GetComponent<Bullet>();
        if (bullet && bullet.Parent != gameObject)
        {
            ReceiveDamage();
        }
    }
}

// Перелік станів героя
public enum CharState
{
    Idle,
    Run,
    Jump
}
